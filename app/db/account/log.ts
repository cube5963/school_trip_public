import prisma from "../db.server";

export async function log(
    loginid: string,
    method: string,
    path: string,
    useragent: string,
    contenttype: string,
) {
    try {
        await prisma.log.create({
            data: {
                loginId: loginid,
                method: method,
                path: path,
                useragent: useragent,
                contenttype: contenttype,
            },
        });
    } catch (e) {
        console.error(e);
    }
}