/**
 * @apiDefine missing_name
 * @apiErrorExample {json} missing_name
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "Missing name",
 *      "code": "missing_name"
 *    }
 *  }
 */
/**
 * @apiDefine missing_last_name
 * @apiErrorExample {json} missing_last_name
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "Missing last name",
 *      "code": "missing_last_name"
 *    }
 *  }
 */
/**
 * @apiDefine missing_age
 * @apiErrorExample {json} missing_age
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "Missing age",
 *      "code": "missing_age"
 *    }
 *  }
 */
/**
 * @apiDefine missing_birthday
 * @apiErrorExample {json} missing_birthday
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "Missing birthday",
 *      "code": "missing_birthday"
 *    }
 *  }
 */
/**
 * @apiDefine invalid_name_type
 * @apiErrorExample {json} invalid_name_type
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "Use string for name",
 *      "code": "invalid_name_type"
 *    }
 *  }
 */
/**
 * @apiDefine invalid_last_name_type
 * @apiErrorExample {json} invalid_last_name_type
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "User string for last name",
 *      "code": "invalid_last_name_type"
 *    }
 *  }
 */
/**
 * @apiDefine invalid_age_type
 * @apiErrorExample {json} invalid_age_type
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "Use number for age",
 *      "code": "invalid_age_type"
 *    }
 *  }
 */
/**
 * @apiDefine invalid_birthday
 * @apiErrorExample {json} invalid_birthday
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "Use a valid value for birthday, follow documentation example",
 *      "code": "invalid_birthday"
 *    }
 *  }
 */
/**
 * @apiDefine invalid_birthday_or_age
 * @apiErrorExample {json} invalid_birthday_or_age
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "error:" {
 *      "message": "'Birthday and Age doesn\'t match'",
 *      "code": "invalid_birthday_or_age"
 *    }
 *  }
 */
