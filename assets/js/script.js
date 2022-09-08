document.addEventListener('click', (event)=> {
    if(event.target.closest('form')!==null && event.target.getAttribute('type') === 'submit'){
        var required = false
        event.target.closest('form').querySelectorAll('input').forEach((x)=>{
            if(!x.checkValidity()) required = true
        })
        if(required) return false
    }
    data.message = '';
    data.sign_up = false;

    if(event.target.matches('.btn-passpoint-info') || event.target.closest('.btn-passpoint-info')){
        event.preventDefault();
        Array.from(document.querySelector('.btn-passpoint-info').children).forEach((x)=> x.classList.toggle('d-none'))
    };

    if(event.target.matches('.btn-get-started')){
        event.preventDefault();
        if(document.querySelector('#user_email')){
            data.user = {
                email: document.querySelector('#user_email').value
            }
        }
        if(document.querySelector('#user_code')) data.user.verified = true
        do_redirect('sign_up');
    };

    if(event.target.matches('.btn-sign-up')){
        event.preventDefault();
        data.user = null
        do_redirect('sign_up');
    };
    if(event.target.matches('.btn-sign-in')){
        event.preventDefault();
        if(event.target.matches('.confirmation-instructions')) {
            data.message = 'If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes.'
        }
        if(event.target.matches('.forget-password')) {
            data.message = 'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.'
        }
        if(event.target.matches('.sign-out')) {
            data.user = null
            data.message = 'Signed out successfully.'
        }
        if(event.target.matches('.cancel-account')){
            if( confirm('Are you sure you want to delete you account?')){
                data.user = null
                data.message = 'Bye! Your account has been successfully cancelled. We hope to see you again soon.'
            }
        }
        var form = document.querySelector('form')
        if(form){
            form.addEventListener('submit', do_redirect('sign_in'));
        }else{
            do_redirect('sign_in');
        }
    };
    if(event.target.matches('.btn-profiles')){
        event.preventDefault();
        if(event.target.matches('.signed-up')) {
            data.sign_up = true
            data.message = 'Welcome! You have signed up successfully.'
        }
        if(event.target.matches('.signed-in')) {
            data.message = 'Signed in successfully.'
            data.user = {
                email: document.querySelector('#user_email').value
            }
        }
        if(event.target.matches('.create-profile')) {
            data.message = 'Passpoint profile was successfully created.'
            data.profile = {
                uuid: 'intertouch-0229bc2c886c5ef68131',
                type: document.querySelector('#selectDevice').value
            }
        }
        if(event.target.matches('.destroy-profile')) {
            if( confirm('Are you sure?')){
                data.message = 'Passpoint profile was successfully destroyed.'
                data.profile = {}
            }
        }
        var form = document.querySelector('form')
        if(form){
            form.addEventListener('submit', do_redirect('profiles'));
        }else{
            do_redirect('profiles');
        }
    };
    if(event.target.matches('.btn-manage')){
        event.preventDefault();
        if(event.target.matches('.update-profile')) {
            if( confirm('Are you sure?')) {
                data.message = 'Your account has been updated successfully.'
                data.user = {
                    email: document.querySelector('#user_email').value
                }
            }
        }
        var form = document.querySelector('form')
        if(form){
            form.addEventListener('submit', do_redirect('manage'));
        }else{
            do_redirect('manage');
        }
    };

if(event.target.matches('.btn-confirmation-instructions')){
        event.preventDefault();
        do_redirect('confirmation_instructions');
    };
    if(event.target.matches('.btn-forget-password')){
        event.preventDefault();
        do_redirect('forget_password');
    };
	if(event.target.matches('.input-reveal')){
        var current = event.target.closest('.input-group').querySelector('input')
        current.getAttribute('type') === 'text' ? current.setAttribute('type', 'password') : current.setAttribute('type', 'text')
    }
}, false);

const do_redirect = (target) => {
    setTimeout(()=>{
        render_template(target, data);
    }, 100)
}

Handlebars.registerHelper('does_url_have', (value) => {
    if(window.location.href.indexOf(value)!=-1) return true
    return false
})