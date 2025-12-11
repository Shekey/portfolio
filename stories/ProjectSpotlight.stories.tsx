import type { Meta, StoryObj } from "@storybook/react";
import { ProjectSpotlight } from "@/components/architect/ProjectSpotlight";

const meta: Meta<typeof ProjectSpotlight> = {
  title: "App/ProjectSpotlight",
  component: ProjectSpotlight,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof ProjectSpotlight>;

export const Default: Story = {};
