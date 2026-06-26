"use client"

import * as React from "react"
import {
  Controller,
  type ControllerProps,
  type FieldValues,
  type Path,
  type UseFormReturn,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

type FormProps<T extends FieldValues = FieldValues> = UseFormReturn<T> & {
  children: React.ReactNode;
};

const Form = <T extends FieldValues = FieldValues>({
  children,
  ...props
}: FormProps<T>) => <FormProvider {...props}>{children}</FormProvider>;

const FormFieldContext = React.createContext<{ name: string } | undefined>(undefined)

const useFormFieldName = () => {
  const ctx = React.useContext(FormFieldContext)
  if (!ctx) throw new Error("Form components must be used within <FormField> render")
  return ctx.name
}

function FormField<T extends FieldValues = FieldValues>(
  props: ControllerProps<T, Path<T>>,
) {
  const { name, render, ...rest } = props
  return (
    <FormFieldContext.Provider value={{ name: String(name) }}>
      <Controller
        name={name}
        render={render as ControllerProps<T, Path<T>>["render"]}
        {...rest}
      />
    </FormFieldContext.Provider>
  )
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-2", className)} {...props} />
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={cn(className)} {...props} />
}

function FormControl({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid", className)} {...props} />
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const name = useFormFieldName()
  const { formState } = useFormContext()
  const errors = formState.errors as Record<string, { message?: string }> | undefined
  const error = errors?.[name]?.message
  if (!error) return null
  return (
    <p className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {error}
    </p>
  )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage }
