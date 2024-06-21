// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "description": "API's user-management application",
        "title": "USER-PROFILE MANAGEMENT API"
    },
    "host": `localhost:${process.env.PORT}`,
    "paths": {
        "/api/users/signup": {
            "post": {
                "tags": ["User"],
                "summary": "User Register",
                "description": "User register in the application",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User Information",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                }
                            },
                            "required": ["username", "email", "password"]
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Invalid input data"
                    }
                }
            }
        },
        "/api/users/signin": {
            "post": {
                "tags": ["User"],
                "summary": "User Sign In",
                "description": "User signin to the application",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "User Credentials",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                }
                            },
                            "required": ["email", "password"]
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Invalid user credentials"
                    }
                }
            }
        },
        "/api/users/profile": {
            "get": {
                "tags": ["User"],
                "summary": "Retrieve user profile",
                "description": "User can retrieve his information",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Unauthorized access!"
                    }
                },
                "security": [{"jwt": []}]
            }
        }
    },
    "securityDefinitions": {
        "jwt": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
};

export default swaggerDocument;
