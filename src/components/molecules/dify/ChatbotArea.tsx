import Script from "next/script";

const DIFY_TOKEN = process.env.NEXT_PUBLIC_DIFY_TOKEN || "oBwt0bauGPyI2IVo";

export default function DifyChatbot() {
  return (
    <>
      <Script
        id="dify-chatbot-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.difyChatbotConfig = {
              token: '${DIFY_TOKEN}',
              inputs: {},
              systemVariables: {},
              userVariables: {},
            }
          `,
        }}
      />
      <Script
        src="https://udify.app/embed.min.js"
        id={DIFY_TOKEN}
        strategy="afterInteractive"
      />
    </>
  );
}
