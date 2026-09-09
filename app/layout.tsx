import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"病历书写入门 · 临床第一课",description:"面向临床新人的21节图文病历书写课：呼吸查体、阴性症状、病程、会诊、操作与出院记录。"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
