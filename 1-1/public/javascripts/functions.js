$(() => {
    $("#update-user").submit(function (e) { 
        e.preventDefault();

        const updatedUser = {
        }

        if (!!$("#update-user-firstName").val()) updatedUser.firstName = $("#update-user-firstName").val()
        if (!!$("#update-user-lastName").val()) updatedUser.lastName = $("#update-user-lastName").val()
        if (!!$("#update-user-password").val()) updatedUser.password = $("#update-user-password").val()
        if (!!$("#update-user-gender").val()) updatedUser.gender = $("#update-user-gender").val()
        if (!!$("#update-user-role").val()) updatedUser.role = $("#update-user-role").val()
        
        fetch(`/user/`,
        {method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
          JSON.parse(JSON.stringify(data))

          $("#firstName").text(JSON.parse(JSON.stringify(data)).firstName)
          $("#lastName").text(JSON.parse(JSON.stringify(data)).lastName)
          $("#username").text(JSON.parse(JSON.stringify(data)).username)
          $("#password").text(JSON.parse(JSON.stringify(data)).password)
          $("#gender").text(JSON.parse(JSON.stringify(data)).gender)
          $("#role").text(JSON.parse(JSON.stringify(data)).role)
        })
    });

    $("#delete-user").submit(function (e) { 
        e.preventDefault();
        
        fetch(`/user/`,
        {method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          document.location.pathname = "/user/login"
        })
    });
})