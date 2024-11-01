-- consulta 
SELECT a.firstName, a.lastName, a.email, ar.role_id, r.name, rp.permission_id, p.name
FROM accounts AS a
INNER JOIN accounts_roles AS ar ON a.id = ar.user_id
INNER JOIN roles AS r ON ar.role_id = r.id
INNER JOIN role_permissions AS rp ON r.id = rp.role_id
INNER JOIN permissions AS p ON rp.permission_id = p.id
WHERE a.email = 'webmaster@app.com';
