import type { Meta, StoryObj } from "@storybook/react";
import { ExperienceLog } from "@/components/architect/ExperienceLog";

const meta: Meta<typeof ExperienceLog> = {
  title: "App/ExperienceLog",
  component: ExperienceLog,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof ExperienceLog>;

export const Default: Story = {};
