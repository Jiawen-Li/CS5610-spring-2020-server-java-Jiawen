function AdminUserServiceClient() {
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001059598/users';
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
    this.findUserById = findUserById;
    const self = this;

    function createUser(user) {
        return fetch(`${self.url}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => response.json());
    }

    function findAllUsers() {
        return fetch(self.url).then((response) => {
            return response.json();
        });
    }

    function findUserById(userId) {
        return fetch(`${self.url}/${userId}`)
            .then((response)=>{
                return response.json();});
    }

    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`,
            {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    "content-type": "application/json"
                }
            }).then(response=>response.json());
    }

    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`, {
            method: "DELETE"
        });
    }
}