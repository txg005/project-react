const UserAPI = {
    users: [
      { id: 1, firstName: "Ghbds", lastName: "Hdk", email: "fjmf@gmail.com" },
      { id: 2, firstName: "mjfg", lastName: "mjfg", email: "jmfj@gmail.com" },
    ],
  
    all: function () {
      return this.users;
    },
  
    get: function (id) {
      return this.users.find((u) => u.id === id);
    },
  
    delete: function (id) {
      this.users = this.users.filter((u) => u.id !== id);
      return true;
    },
  
    add: function (user) {
      if (!user.id) {
        user = {
          ...user,
          id:
            this.users.length > 0
              ? Math.max(...this.users.map((u) => u.id)) + 1
              : 1,
        };
      }
      this.users = [...this.users, user];
      return user;
    },
  
    update: function (user) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
      return user;
    },
  };
  
  export default UserAPI;