import type { Meta, StoryObj } from '@storybook/react';
import { BGVoteToken } from '@/components/BGVoteToken';

const meta: Meta<typeof BGVoteToken> = {
  title: 'DAO/BGVoteToken',
  component: BGVoteToken,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BGVoteToken>;

export const Default: Story = {
  args: {
    tokenDetails: {
      name: 'BGVOTE',
      symbol: 'BGVOTE',
      supply: 1000,
      transferability: 'NONE',
      metadata: {
        assetClassification: 'VOTE-001',
        regulatoryStatus: 'CommunityUtility',
        nativeChain: 'GUAPX',
      }
    }
  }
};

export const Loading: Story = {
  args: {
    loading: true
  }
};

export const Error: Story = {
  args: {
    error: 'Failed to deploy token contract'
  }
};

export const Deployed: Story = {
  args: {
    ...Default.args,
    status: 'deployed',
    deployedAddress: '0x1234...5678'
  }
}; 