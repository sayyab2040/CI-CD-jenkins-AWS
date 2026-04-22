node{
    def appDir = 'var/www/three-tier-application'

    stage('Clean Workspace'){
        echo 'cleaning jenkins Workspace'
        deleteDir()
    }

    stage('Clone Repo'){
        echo 'cleaning the repo'
        git(
            branch: 'main', 
            url: 'https://github.com/sayyab2040/CI-CD-jenkins-AWS'
        )
    }
    stage('Deploy to EC2'){
        echo 'Deploying to EC2'
        sh """
            sudo mkdir -p ${appDir}
            sudo chown -R jenkins: ${appDir}

            rsync -av --delete --exclude='.git' --exclude ='node _modules' ./ ${appDir}

            cd ${appDir}
            sudo npm install 
            sudo npm run build
            sudo fuser -k 3000/tcp ||true
            npm run start

        """
    }



}
