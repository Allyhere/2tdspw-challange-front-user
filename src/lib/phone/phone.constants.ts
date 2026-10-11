import { z } from "zod";

export const nationalMobile = z.string().regex(/^[1-9]{2}9\d{8}$/);

export const otpCode = z.string().regex(/^\d{6}$/);
