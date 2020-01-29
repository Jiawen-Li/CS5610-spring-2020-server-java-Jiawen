(function () {
    let userService = new AdminUserServiceClient();
    let users = [];
    let currentUserId = -1;

    $(main());

    function main() {

        let $editBtn = $('#wbdv-edit');
        let $createBtn = $('#wbdv-create');
        let $updateBtn = $('#wbdv-update')

        $createBtn.click(createUser);
        $updateBtn.click(updateUser);

        // let $userRowTemplate = $('.wbdv-template');
        // let $tbody = $('tbody');

        findAllUsers()
    }


    function createUser() {
        let $usernameFld = $('#usernameFld');
        let $passwordFld = $('#passwordFld');
        let $firstNameFld = $('#firstNameFld');
        let $lastNameFld = $('#lastNameFld');
        let $roleFld = $('#roleFld');
        userService.createUser({
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }).then(newUser => {
            findAllUsers();
        });

        $usernameFld.val('');
        $passwordFld.val('');
        $firstNameFld.val('');
        $lastNameFld.val('');

    }

    function findAllUsers() {
        userService.findAllUsers().then(theUsers => {
            users = theUsers;
            renderUsers();
        })
    }

    function findUserById(userId) {
        return userService.findUserById(userId)
    }

    function deleteUser(index) {
        const userId = users[index]._id;
        userService.deleteUser(userId)
            .then(response => {
                users.splice(index, 1);
                renderUsers();
            })
    }

    function updateUser() {
        const $usernameFld = $('#usernameFld');
        const $passwordFld = $('#passwordFld');
        const $firstNameFld = $('#firstNameFld');
        const $lastNameFld = $('#lastNameFld');
        const $roleFld = $('#roleFld');

        userService.updateUser(currentUserId, {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }).then(newUsers => {
            findAllUsers();
            $usernameFld.val("");
            $passwordFld.val("");
            $firstNameFld.val("");
            $lastNameFld.val("");
        });
    }

    function renderUsers() {
        const $userlistFld = $('#userlistFld').find('tbody');
        $userlistFld.empty();

        for (let u = 0; u < users.length; u++) {
            renderUser(users[u], u);
        }
    }

    function renderUser(user, index) {
        const $userListFld = $('#userlistFld').find('tbody');
        const $remove_button = $('<button style="background-color: burlywood; color: white;\n' +
            '                                    border:none; width: 40px;height: 30px;\n' +
            '                                    text-align: center; vertical-align: baseline">\n' +
            '                                 <i class="fa-x fa fa-times"\n' +
            '                                    style="text-align: center"></i></button>')
        const $edit_button = $('<button style="background-color: cornflowerblue; color: white;\n' +
            '                                    border:none; width: 40px;height: 30px;\n' +
            '                                    text-align: center; vertical-align: baseline">\n' +
            '                                <i class="fa-x fas fa-edit"></i></button>')
        $remove_button.click(() => {deleteUser(index)});
        $edit_button.click(() => {editUser(index)});
        $userListFld
            .append($('<tr>')
                .append($('<td>').text(user.username))
                .append($('<td>').text(user.password))
                .append($('<td>').text(user.firstName))
                .append($('<td>').text(user.lastName))
                .append($('<td>').text(user.role))
                .append($('<td>').append($('<span>').attr('class', 'float-right').append($remove_button)
                    .append($edit_button))
                ));

    }

    function editUser(index){
        const $usernameFld = $('#usernameFld');
        const $passwordFld = $('#passwordFld');
        const $firstNameFld = $('#firstNameFld');
        const $lastNameFld = $('#lastNameFld');
        const $roleFld = $('#roleFld');

        const userId = users[index]._id;
        currentUserId = userId;
        findUserById(userId).then(user=>{
            $usernameFld.val(user.username);
            $passwordFld.val(user.password);
            $firstNameFld.val(user.firstName);
            $lastNameFld.val(user.lastName);
            $roleFld.val(user.role);
        })

    }

})();