// Express
import { Request, Response, NextFunction } from 'express';

// Types
import {
  ErrorResponseType,
  MessageType,
  UserCreateInput,
} from '../types/types.js';

// Message config
import messages from '../configs/messagesConfig.js';

// Validation constants
const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,24}$/,
};

const VALID_PROVIDERS = ['local', 'google', 'facebook'];

/**
 * Validates user registration data
 */
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body as Partial<UserCreateInput>;
  const { email, name, registerProvider, password, avatarUrl } = data;

  // Initialize error response
  const errorResponse: MessageType & { errors: ErrorResponseType } = {
    ...messages.VALIDATION_ERROR,
    errors: {},
  };

  // Validate required fields
  const addErrorIfMissing = (field: string, value?: string) => {
    if (!value || value.trim() === '') {
      errorResponse.errors[field] = {
        field,
        message: `The ${field} field is required.`,
      };
      return true;
    }
    return false;
  };

  // Check required fields
  ['email', 'name', 'registerProvider'].forEach((field) =>
    addErrorIfMissing(field, data[field as keyof typeof data] as string)
  );

  // Validate email format
  if (email && !errorResponse.errors['email'] && !PATTERNS.EMAIL.test(email)) {
    errorResponse.errors['email'] = {
      field: 'email',
      message: 'Invalid email address.',
    };
  }

  // Validate register provider
  if (
    registerProvider &&
    !errorResponse.errors['registerProvider'] &&
    !VALID_PROVIDERS.includes(registerProvider)
  ) {
    errorResponse.errors['registerProvider'] = {
      field: 'registerProvider',
      message: 'Register provider must be local, facebook or google.',
    };
  }

  // Password validation for local registration
  if (registerProvider === 'local') {
    if (addErrorIfMissing('password', password)) {
      // Password field already marked as error, skip pattern check
    } else if (!PATTERNS.PASSWORD.test(password!)) {
      errorResponse.errors['password'] = {
        field: 'password',
        message:
          'Password must be 6-24 characters and include at least 1 lowercase, 1 uppercase, and 1 special character.',
      };
    }
  }

  // Validate avatar URL if provided
  if (avatarUrl && !URL.canParse(avatarUrl)) {
    errorResponse.errors['avatarUrl'] = {
      field: 'avatarUrl',
      message: 'Invalid url',
    };
  }

  // Return error response if validation failed
  if (Object.keys(errorResponse.errors).length > 0) {
    res.status(errorResponse.statusCode).json(errorResponse);
    return;
  }

  next();
};
