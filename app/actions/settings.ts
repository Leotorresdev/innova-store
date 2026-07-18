'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getGlobalSettings() {
  try {
    const settings = await prisma.globalSettings.findUnique({
      where: { id: 'global' }
    });

    if (!settings) {
      return await prisma.globalSettings.create({
        data: { id: 'global', preventasEnabled: true }
      });
    }

    return settings;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    // Return a default if DB fails
    return { id: 'global', preventasEnabled: true };
  }
}

export async function togglePreventas(enabled: boolean) {
  try {
    const settings = await prisma.globalSettings.upsert({
      where: { id: 'global' },
      update: { preventasEnabled: enabled },
      create: { id: 'global', preventasEnabled: enabled }
    });

    // Revalidate paths that depend on this setting
    revalidatePath('/', 'layout');
    revalidatePath('/preventas');
    revalidatePath('/admin');
    
    return { success: true, settings };
  } catch (error) {
    console.error('Error toggling preventas:', error);
    return { success: false, message: 'No se pudo actualizar la configuración' };
  }
}
