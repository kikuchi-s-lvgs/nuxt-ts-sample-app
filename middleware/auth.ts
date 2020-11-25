import { Middleware } from '@nuxt/types'
import { auth } from '../plugins/firebase'

const middleware: Middleware = ({ route, store, redirect }) => {
    // ルートのみ非認証で表示させる
    if (route.path === '/') {
        return
    }
    auth.onAuthStateChanged((user) => {
        if (!user && route.name !== 'login') {
            redirect('/login')
        }
    })
}
export default middleware