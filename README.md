# Eksperter i team
## IT-styring av moderne lastebiler - Gruppe 2

### Kjøre backend
<ol>
<li>Gå inn i server-mappen</li>
<pre><code>$ cd server</code></pre>
<li>Lag et virtual environment</li>
<pre><code>$ python3 -m venv myvenv</code></pre>
<li>Aktiver virtual environment</li>
<pre><code>$ . myvenv/bin/activate</code></pre>
<li>Installer dependencies</li>
<pre><code>$ pip install -r requirements.txt</code></pre>
<li>Kjør applikasjonen</li>
<pre><code>$ export FLASK_APP=server.py
$ export FLASK_ENV=development
$ flask run
</code></pre>
</ol>