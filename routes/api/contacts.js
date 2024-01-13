const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../utils");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (request, response, next) => {
  try {
    const result = await contacts.listContacts();
    response.status(200).json(result);
  } catch (error) {
    // response.status(500).json({ message: "Not found" });
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
      //   const error = new Error("Not found");
      //   error.status = 404;
      //   throw error;
    }
    response.status(200).json(result);
  } catch (error) {
    //   const {status = 500, message = "Server error"} = error
    // response.status(status).json({ message });
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    // const { error } = addSchema.validate(request.body)
    //  if (error) {
    const validateResult = addSchema.validate(request.body);
    if (validateResult.error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await contacts.addContact(request.body);
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    if (!id) {
      throw HttpError(404, "missing fields");
    }
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const validateResult = addSchema.validate(request.body);
    if (validateResult.error) {
      throw HttpError(400, "missing fields");
    }
    const { id } = request.params;
    const result = await contacts.updateContact(id, request.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
