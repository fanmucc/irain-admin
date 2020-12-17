// 对没有icon的路由数据进行填充

export const routerIconSwitch = (name) => {
    switch (name) 
    {
        case 'Site': 
            return 'md-cog'
            break
        case 'Info':
            return 'ios-folder-open'
            break
        case 'Label':
            return 'ios-pricetag'
            break
        case 'LabelAdd': 
            return 'md-add'
            break
        case 'LabelEdit': 
            return 'md-pricetag'
            break
        case 'LabelDel':
            return 'md-remove'
            break
        case 'Article': 
            return 'ios-albums'
        case 'ArticleAdd':
            return 'md-add'
            break
        case 'ArticleEdit':
            return 'md-create'
            break
        case 'ArticleDel':
            return 'md-remove'
            break
        case 'Logs':
            return 'md-hammer'
            break
        default:
            return ''
            
    }
        
}