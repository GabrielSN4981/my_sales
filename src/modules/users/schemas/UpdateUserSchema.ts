import { celebrate, Joi, Segments } from "celebrate";

export const UpdateUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    // password_confirmation é um campo adicional para confirmar a nova senha
    password_confirmation: Joi.string()
      // valid verifica se o valor do campo é igual ao valor do campo password
      .valid(Joi.ref("password"))
      // when serve para condicionar a obrigatoriedade do campo
      .when("password", {
        // is verifica se o campo password existe
        is: Joi.exist(),
        // then define que se o campo password existir, o campo password_confirmation é obrigatório
        then: Joi.required(),
      }),
  },
});
