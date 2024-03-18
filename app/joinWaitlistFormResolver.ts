import { joinWaitlistFormSchema } from './joinWaitlistFormSchema';
import type { Resolver, FieldError } from 'react-hook-form';
import { z, ZodError as ZodValidationError } from 'zod';

export type JoinWaitlistFormInputs = z.infer<typeof joinWaitlistFormSchema>;

export const joinWaitlistFormResolver: Resolver<JoinWaitlistFormInputs> = async (values: JoinWaitlistFormInputs) => {
  try {
    const validatedData: JoinWaitlistFormInputs = await joinWaitlistFormSchema.parseAsync(values);
    return { values: validatedData, errors: {} };
  } catch (error) {
    const zodError = error as ZodValidationError;
    const fieldErrorEntries = Object.entries(zodError.formErrors.fieldErrors || {});

    const rhfErrors: Record<string, FieldError> = {};

    for (const [field, fieldErrors] of fieldErrorEntries) {
      if (fieldErrors) {
        rhfErrors[field] = {
          type: 'manual',
          message: fieldErrors[0],
        };
      }
    }

    return { values: {} as JoinWaitlistFormInputs, errors: rhfErrors };
  }
};
