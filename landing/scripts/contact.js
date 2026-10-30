export function InitContactForm()
{
    const form = document.getElementById('contact-form');
    const StatusDiv = document.getElementById('form-status');
    const SubmitBtn = document.getElementById('contact-submit');

    if (!form) return;

    form.addEventListener('submit', async function(event)
    {
        event.preventDefault();

        StatusDiv.textContent = '';
        StatusDiv.style.color = '';
        SubmitBtn.disabled = true;

        const OriginalBtnText = SubmitBtn.textContent || 'Send';
        SubmitBtn.textContent = 'Sending...';

        const _FormData = new FormData(form);

        try
        {
            const response = await fetch(form.action, {
                method: 'POST',
                body: _FormData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok)
            {
                StatusDiv.textContent = 'Thanks! Your message has been sent.';
                StatusDiv.style.color = 'green';
            }
            else
            {
                const ErrorMsg = data.errors
                    ? data.errors.map(e => e.message).join(', ')
                    : 'Something went wrong.';
                StatusDiv.textContent = ErrorMsg;
                StatusDiv.style.color = 'red';
            }
        }
        catch (err)
        {
            StatusDiv.textContent = 'Network error. Please try again.';
            StatusDiv.style.color = 'red';
        }
        finally
        {
            SubmitBtn.disabled = false;
            SubmitBtn.textContent = OriginalBtnText;
        }
    });
}