        // Show/hide account menu on hover
        $('.account').hover(
            function () {
                $('.account-menu').fadeIn();
            },
            function () {
                $('.account-menu').fadeOut();
            }
        );

        // jQuery animation to slide out the menu and go to another page (placeholder links)
        function animateAndRedirect(buttonId) {
            $(buttonId).on('click', function (e) {
                e.preventDefault();
                $('#menuBox').css('animation', 'slideOutLeft 0.5s forwards');
                setTimeout(function () {
                    window.location.href = ''; // Placeholder, no URL provided
                }, 500);
            });
        }

        // Apply animation for all menu buttons
        animateAndRedirect('#mapBtn');
        animateAndRedirect('#accountBtn');
        animateAndRedirect('#awardsBtn');