# React Boilerplate

Estrutura de projetos front-end com o seguinte stack:

- Docker

- React v16.8

- SCSS/Postcss

- Lints:
  - Eslint
  - Prettier
  - Stylelint
  - Pre-commit

# O que é necessário?

- Docker

# Instalação

| docker-compose up dev | Vai aplicar a instalação e iniciar o projeto na porta 8080.

# Setup de sua IDE

Para manter a qualidade de código e ter sempre um padrão entre todos da equipe o projeto tem regras definidas para javascript e css/scss.

Usamos o Eslint/Prettier para Javascript/React e o Stylelint para SCSS.

É necessário a integração dessas regras com o sua IDE favorita. Recomendamos o uso do Visual Studio Code com os seguintes plugins:

| Plugin | README |

| --------- | ------------------------------------------------------------------------------------------ |

| ESlint | [check plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) |

| Prettier | [check plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |

| stylelint | [check plugin](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) |

# Pre-commit

Antes de executar o git commit é executado as regras do ESLint e Stylelint. Se existir algum erro ou algum código fora do padrão do site vai ser gerado um erro e o não vai ser possível executar o commit.

# Rodando o projeto

Abaixo os comandos que são usados no projeto:

| Comando | Description |

| ----------------------- | --------------------------------------------------------------------------------------------- |

| docker-compose up dev | Caso a atualização já exista, somente roda o projeto em modo de desenvolvimento na porta 8080 |

| docker-compose up prod | Gera uma compilação da aplicação no diretório `dist/` e roda o servidor de express na porta 3000 |

| docker-compose up vectors | Converte os vetores (SVGs) da pasta `assets/svg` para componentes React |

# Docker

Certifique-se de ter o Docker instalado.

Execute:

```
docker-compose up dev
```

o servidor estará aberto na porta 8080: <https://localhost:8080>

**Rodando o build via do Docker**

**Build**

```
docker run -v `pwd`:/app -i mangar/webapp-front:8.4 npm run build-prod
```

**Lints**

```
//JSLint

docker run -v `pwd`:/app -i mangar/webapp-front:8.4 npm run lintjs


//CSSLint

docker run -v `pwd`:/app -i mangar/webapp-front:8.4 npm run lintcss
```

# Jenkins

## Steps

### Build Triggers

**Poll SCM**

```
* * * * *
```

### Build

**Step1: Execute shell >> build**

```
echo "----------------------------------------------------------------------------------------------"
echo " BUILD "

cd ${WORKSPACE}
/Applications/Docker.app/Contents/Resources/bin/docker run -v `pwd`:/app -i mangar/webapp-front:8.4.1 npm run build-prod
echo "----------------------------------------------------------------------------------------------"
```

**Step2: Execute shell >> version.txt**

```
echo "----------------------------------------------------------------------------------------------"
echo " VERSION "

export TAG=`date +%y%m%d-%H%M%S`
cd ${WORKSPACE}/public

echo $TAG > version.txt
echo "----------------------------------------------------------------------------------------------"
```

**Step3: Execute shell >> Git Tag**

```
echo "----------------------------------------------------------------------------------------------"
echo " GIT TAG"

export LC_ALL=en_US.UTF-8
cd ${WORKSPACE}

export TAG=`date +%y%m%d-%H%M%S`
git tag DEV-$TAG
git push origin DEV-$TAG
echo "----------------------------------------------------------------------------------------------"
```

**Step4: Execute shell >> Upload S3**

```
echo "----------------------------------------------------------------------------------------------"
echo " UPLOAD S3"

cd ${WORKSPACE}
/Applications/Docker.app/Contents/Resources/bin/docker run -v `pwd`:/app -i mangar/webapp-front:8.4.1 bash -c "/bin/bash /app/_extras/scripts/s3.sh /app/_extras/scripts/s3-develop.json"
echo "----------------------------------------------------------------------------------------------"
```
