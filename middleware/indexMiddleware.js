export default function ({
    route,
    redirect
}) {
    // Check if the current route is the root '/' route
    if (route.path === '/') {
        // Redirect to the '/birthday/' route
        return redirect('/birthday/');
    }
}