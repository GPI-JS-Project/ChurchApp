export default function ({
    route,
    redirect
}) {
    // Check if the current route is the root '/' route
    if (route.path === '/') {
        // Redirect to the '/birthday/' route
        return redirect('/');
    }
    if (route.path === '/birthday') {
        // Redirect to the '/birthday/' route
        return redirect('/birthday/');
    }
    if (route.path === '/anniversary') {
        // Redirect to the '/birthday/' route
        return redirect('/anniversary/');
    }
}