import { Divider, Typography } from "antd";
import type { PropsWithChildren } from "react";

export interface SectionProps {
  className?: string;
  title?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Section({
  children,
  title,
  className,
  style,
}: PropsWithChildren & SectionProps) {
  return (
    <section className={className} style={style}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        {title}
      </Typography.Title>
      {children}
      <Divider
        styles={{
          root: {
            marginBlock: 15,
          },
        }}
      />
    </section>
  );
}
