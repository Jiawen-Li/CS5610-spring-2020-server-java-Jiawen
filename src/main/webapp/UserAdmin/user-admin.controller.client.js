(function () {
    let userService = new AdminUserServiceClient();
    let users = [];
    let currentUserId = -1;

    $(main());

    function main() {
        let $usernameFld = $('#usernameFld');
        let $passwordFld = $('#passwordFld');
        let $removeBtn = $('#wbdv-remove');
        let $editBtn = $('#wbdv-edit');
        let $createBtn = $('#wbdv-create');
        let $firstNameFld = $('#firstNameFld');
        let $lastNameFld = $('#lastNameFld');
        let $roleFld = $('#roleFld');

        $createBtn.click(createUser);
        $removeBtn.click(deleteUser);
        $editBtn.click(updateUser);

        let $userRowTemplate = $('.wbdv-template');
        let $tbody = $('tbody');

        findAllUsers()
    }


    function createUser() {
        userService.createUser( {
            username: $usernameFld.val(),
            password: $passworldFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        }

        $usernameFld.val('')
        $passwordFld.val('')
        $firstNameFld.val('')
        $lastNameFld.val('')

        users.push(newUser)
        console.log(users)
        renderUsers()
    }

    function findAllUsers() {
        userService.findAllUsers().then(theUsers => {
            users = theUsers;
            renderUsers();
        })
    }

    function findUserById() {

    }

    function deleteUser(index) {

    }

    function selectUser() {

    }

    function updateUser(index) {

    }

    function renderUsers() {
        const $userlistFld = $('#userlistFld').find('tbody');
        $userlistFld.find('tbody').empty();

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
            '                                    text-align: center; vertical-align: baseline>\n' +
            '                                <i class="fa-x fas fa-edit"></i></button>')
        $remove_button.click(deleteUser(index));
        $edit_button.click(updateUser(index));
        $userListFld
            .append($('<tr>')
                .append($('<td>').text(user.username))
                .append($('<td>').text(user.password))
                .append($('<td>').text(user.firstName))
                .append($('<td>').text(user.lastName))
                .append($('<td>').text(user.role))
                .append($('<td>').append($('<span>').attr('class','float-right')
                    .append($remove_button)
                    .append($edit_button)
                )));

    }


})();