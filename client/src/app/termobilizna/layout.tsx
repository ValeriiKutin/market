
export default function TermobiliznaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=''>
            {/* <FIlterBar /> */}
            <div className="ml-[300px]">
                {children}
            </div>
        </div>
    );
}