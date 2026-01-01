import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Circle from "./Circle";

const meta = {
  component: Circle,
  title: "Circle",
  parameters: {
    nextjs: {
      appDirectory: true,
    }
  }
} satisfies Meta<typeof Circle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseCircle: Story = {
  args: {},
};
