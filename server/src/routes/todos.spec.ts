describe("Todos API", () => {
  // getting todo items
  describe("GET /todos", () => {
    it("should return the list of todo items", async () => {});
  });

  // getting specific todo item
  describe("GET /todos/id", () => {
    describe("if specific todo item exists", () => {
      it("should return todo item", async () => {});
    });
    describe("if specific todo item does not exists", () => {
      it("should return Not Found 404 status code", async () => {});
    });
  });

  // creating todo item
  describe("POST /todos", () => {
    describe("if request body is valid", () => {
      it("should create new todo item", async () => {});
    });
    describe("if request body is not valid", () => {
      it("should return Bad Request 400 status code", async () => {});
    });
  });

  // updating todo item
  describe("PATCH /todos/id", () => {
    describe("if specific todo item exists", () => {
      describe("if data to update is valid", () => {
        it("should update existing todo item with new data", async () => {});
      });
      describe("if data to update is not valid", () => {
        it("should return Bad Request 400 status code", async () => {});
      });
    });
    describe("if specific todo item does not exists", () => {
      it("should return Bad Request 400 status code", async () => {});
    });
  });

  //  deleting todo item
  describe("DELETE /todos/id", () => {
    describe("if specific todo item exists", () => {
      it("should delete todo item", async () => {});
    });
    describe("if specific todo item does not exists", () => {
      it("should return Bad Request 400 status code", async () => {});
    });
  });
});
