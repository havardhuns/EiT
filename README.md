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

### Kjøre frontend
<ol>
<li> Installer npm
<li>Gå inn i client-mappen</li>
<pre><code>$ cd client</code></pre>
<li>Installer dependencies (første gang, eller hvis noen nye er lagt til)</li>
<pre><code>$ npm install</code></pre>
<li>Kjør applikasjonen</li>
<pre><code>$ npm start
</code></pre>
</ol>