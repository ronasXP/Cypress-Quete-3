import { faker } from '@faker-js/faker';
      const nameUser = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
    describe("template spec", () => {
      let token = null;

      it("Create User test", () => {
        cy.request({
          url: "https://practice.expandtesting.com/notes/api/users/register",
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: {
            name: nameUser, 
            email: email,
            password: password,
          },
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.message).to.eq("User account created successfully");
          expect(response.body.success).to.equal(true);
        });
      });
    
      it("Login", () => {
        cy.request({
            url: "https://practice.expandtesting.com/notes/api/users/login",
            method: "POST",
            headers: {
                accept: "application/json",
            },
            body: {
              "email": email,
              "password": password,
            }
          }).then((response) => {
            cy.log(JSON.stringify(response));
            token = response.body.data.token;
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal("Login successful");
            expect(response.body.success).to.equal(true);
          });
      });
    
      it("create a note", () => {
        cy.fixture("userData").then((userData) => {
          const note = userData[0];
        cy.request({
          url: "https://practice.expandtesting.com/notes/api/notes/",
          method: "POST",
          headers: {
            accept: "application/json",
            "x-auth-token": token,
          },
          body: {
            title : note.title,
            description: note.description, 
            category: note.category,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Note successfully created");
          expect(response.body.success).to.equal(true);
        });
      });
    });
  });