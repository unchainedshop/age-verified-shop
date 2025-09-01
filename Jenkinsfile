pipeline {
  agent {
    label "docker-agent-local" // Using docker-agent-local here which uses the docker endpoint of the current machine so we have access to volumes between stages
  }
  environment {
    DOCKER_BUILDKIT = 1
    REGISTRY_AUTH = credentials('eec0f0c2-9b9d-4b26-8da5-58222499d901')
  }
  tools { dockerTool "docker" }
  stages {
    stage('Login to Registry') {
      steps {
        script {
          sh 'docker login -u ${REGISTRY_AUTH_USR} -p ${REGISTRY_AUTH_PSW} registry.ucc.dev'

          def packageJson = readJSON file: './package.json'
          def packageVersion = packageJson.version
          def versionChunks = packageVersion.split(/\./)
          VERSION_MAJOR = versionChunks[0]
          VERSION_MINOR = versionChunks[1]
          VERSION_PATCH = versionChunks[2]
        }
      }
    }
    stage('Build Engine') {
        steps{
            script {
                engine = docker.build("registry.ucc.dev/age-verified-shop/engine:$GIT_COMMIT","-f ./engine/Dockerfile ./engine")
                engine.push("stable")
            }
        }
    }
    stage('Build Frontend') {
        when { branch 'main' }
        steps {
            script {              
                NEXT_PUBLIC_GRAPHQL_ENDPOINT = 'https://swiyu.unchained.wtf/graphql'
                UNCHAINED_ENDPOINT = 'https://swiyu.unchained.wtf/graphql'

                storefront = docker.build("registry.ucc.dev/age-verified-shop/storefront:$GIT_COMMIT-main",
                "--build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT=${NEXT_PUBLIC_GRAPHQL_ENDPOINT} " +
                "--build-arg UNCHAINED_ENDPOINT=${UNCHAINED_ENDPOINT} " +
                "-f ./storefront/Dockerfile ./storefront")
                storefront.push("stable")
            }
        }
    }
  }
}
