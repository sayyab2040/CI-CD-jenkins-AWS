node {
    def appDir = '/var/www/three-tier-application'

    stage('Clean Workspace') {
        echo 'Cleaning Jenkins workspace'
        deleteDir()
    }

    stage('Clone Repo') {
        echo 'Cloning repository from GitHub'
        git(
            branch: 'main',
            url: 'https://github.com/sayyab2040/CI-CD-jenkins-AWS.git'
        )
    }

    stage('Deploy Application') {
        echo 'Deploying three-tier application'
        sh """
            sudo mkdir -p ${appDir}
            sudo chown -R jenkins:jenkins ${appDir}

            rsync -av --delete \\
                --exclude='.git' \\
                --exclude='node_modules' \\
                ./ ${appDir}/

            cd ${appDir}/backend
            npm install

            sudo fuser -k 3000/tcp || true
            nohup npm run start > backend.log 2>&1 &
        """
    }
}