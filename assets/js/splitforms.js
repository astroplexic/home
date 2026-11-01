/* Spitforms.com form submission script */

    (function () {
      var form = document.getElementById('my-form');
      var status = document.getElementById('status');
      var btn = document.getElementById('submit-btn');

      function setStatus(msg, cls) {
        status.textContent = msg;
        status.className = cls || '';
      }

      form.addEventListener('reset', function () { setStatus('', ''); });

      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!form.reportValidity()) return;

        btn.disabled = true;
        setStatus('Sending…', '');

        try {
          // Send the whole form so the hidden sf_sid field added by embed.js goes along.
          var res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          });
          var data = {};
          try { data = await res.json(); } catch (_) {}

          if (res.ok && data.success !== false) {
            setStatus('Thanks! Your message was sent.', 'ok');
            form.reset();
            setStatus('Thanks! Your message was sent.', 'ok');
          } else {
            setStatus(data.message || 'Something went wrong. Check your entries and try again.', 'err');
          }
        } catch (err) {
          setStatus('Could not reach the server. Check your connection and try again.', 'err');
        } finally {
          btn.disabled = false;
        }
      });
    })();