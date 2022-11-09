module.exports = {
  schemas: {
    error400: {
      properties: {
        message: {
          type: "string",
          description: "Error message",
          example: "Bad request",
        },
        errorCode: {
          type: "number",
          example: 400,
        },
      },
    },
    discoverData: {
      properties: {
        id: {
          type: "number",
          example: "1",
        },
        image: {
          type: "string",
          example: "http://localhost:5000/1666247987348-pulau-marabatua.jpg",
        },
        location: {
          type: "string",
          example: "Pulau Marabatua",
        },
        href: {
          type: "string",
          example: "https://goo.gl/maps/qVXSioSzzRBKZjsv7",
        },
      },
    },
    status: {
      type: "string",
      example: "success",
    },
  },
};
