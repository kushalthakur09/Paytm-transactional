const z = require("zod");

const signUpSchemaValidator = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, "Username must be at least 4 characters")
    .max(15, "Username must be max 15 characters")
    .toLowerCase()
    .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),

  firstName: z
    .string({ required_error: "First name is required" })
    .max(50, "First name must be max 50 characters")
    .min(1,"firstName is required")
    .toLowerCase()
    .trim(),

  lastName: z
    .string({ required_error: "Last name is required" })
    .max(50, "Last name must be max 50 characters")
    .min(1,"lastName is required")
    .toLowerCase()
    .trim(),
});

const signInSchemaValidator=z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, "Username must be at least 4 characters")
    .max(15, "Username must be max 15 characters")
    .toLowerCase()
    .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")

});
module.exports ={signUpSchemaValidator,signInSchemaValidator}