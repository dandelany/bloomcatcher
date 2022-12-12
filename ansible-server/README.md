## ansible-server
ansible scripts/roles/etc. for deploying the bloomcatcher server (& web client)

#### Deploy to server
`ansible-playbook -v playbooks/deploy.yml`

# NOTES
`roles` contains a local copy of `ansible-role-nvm` modified slightly to work with Ansible 7/core 2.14.
This can be changed to the official version if/when Ansible 7 is supported.
More info: https://github.com/morgangraphics/ansible-role-nvm/issues/35
