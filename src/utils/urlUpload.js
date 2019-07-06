import config from 'config'

export const urlConf = `${config.get('protocol')}://${config.get('host')}`
    
    
