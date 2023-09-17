export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {children}
        </main>
    );
}
