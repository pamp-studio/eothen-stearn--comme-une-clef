# Create SQL Login template for Azure SQL Database
## select master and 'new query'
<pre><code>
CREATE LOGIN LoginName 	
WITH PASSWORD = 'password' 
GO
</code></pre>
## select your db in the dropdown and create a user mapped to a login 
<pre><code>
CREATE USER LoginName 
FOR LOGIN LoginName 
WITH DEFAULT_SCHEMA = dbo;
</code></pre> 
## add user to role(s) in db
<pre><code>
ALTER ROLE db_owner ADD MEMBER LoginName;
</code></pre> 
