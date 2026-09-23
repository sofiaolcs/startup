# CS 260 Notes

I love web programming

This file represents what I have learned about web programming.

- [My startup](https://passarela.click/)
- [My simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My website is on this domain: [My website](https://passarela.click/), and any subdomains: *.passarela.click

## HTML

# Using SSH Private Keys with WSL on Windows

When using Bash scripts, `ssh`, or `scp` in WSL, avoid storing private keys under `/mnt/c/`, especially inside OneDrive. Windows-mounted files do not support Linux file permissions correctly, so SSH may reject the key with an “UNPROTECTED PRIVATE KEY FILE” error.

Copy the key into WSL’s Linux filesystem:

```bash
mkdir -p /home/username/.ssh
cp /path/to/key.pem /home/username/.ssh/key.pem
chmod 400 /home/username/.ssh/key.pem
```

Verify the permissions:

```bash
ls -l /home/username/.ssh/key.pem
```

The file should begin with:

```text
-r--------
```

Use the Linux path when running the deployment script.

Windows paths such as:

```text
C:\Users\username\...
```

appear in WSL as:

```text
/mnt/c/Users/username/...
```

## React

Interesting things I have learned about React
