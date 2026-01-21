import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useState } from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskListGrid from './TaskListGrid';

// Mock AG Grid React component
vi.mock('ag-grid-react', () => ({
  AgGridReact: ({ rowData, columnDefs, masterDetail, pagination }) => (
    <div data-testid="ag-grid-mock">
      <div data-testid="ag-grid-row-count">{rowData?.length || 0}</div>
      <div data-testid="ag-grid-column-count">{columnDefs?.length || 0}</div>
      <div data-testid="ag-grid-master-detail">{masterDetail ? 'true' : 'false'}</div>
      <div data-testid="ag-grid-pagination">{pagination ? 'true' : 'false'}</div>
      {rowData?.map((row, idx) => (
        <div key={idx} data-testid={`ag-grid-row-${idx}`}>
          {row.title}
        </div>
      ))}
    </div>
  ),
}));

// Mock AG Grid modules
vi.mock('ag-grid-community', () => ({
  ClientSideRowModelModule: {},
  ModuleRegistry: { registerModules: vi.fn() },
  ValidationModule: {},
  PaginationModule: {},
  themeMaterial: {},
  AllCommunityModule: {},
}));

vi.mock('ag-grid-enterprise', () => ({
  MasterDetailModule: {},
  SetFilterModule: {},
}));
 
// Mock useTaskLists hook to provide controlled data
vi.mock('../../hooks/useTaskLists', () => ({
  useTaskLists: () => {
    const [taskLists, setTaskLists] = useState([
      {
        id: 1,
        title: 'Test Task List',
        status: 'in-progress',
        items: [
          { id: 1, title: 'Test Item', completed: false }
        ]
      }
    ]);
    
    return {
      taskLists,
      setTaskLists,
      loading: false,
      error: null
    };
  }
}));

describe('TaskListGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders the task lists heading', () => {
      render(<TaskListGrid />);
      expect(screen.getByText('Task Lists')).toBeInTheDocument();
    });

    it('renders the AG Grid summary table heading', () => {
      render(<TaskListGrid />);
      expect(screen.getByText('AgGrid Summary Table')).toBeInTheDocument();
    });

    it('renders AG Grid component', () => {
      render(<TaskListGrid />);
      expect(screen.getByTestId('ag-grid-mock')).toBeInTheDocument();
    });

    it('displays grid layout for cards', () => {
      const { container } = render(<TaskListGrid />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
    });
  });

  describe('AG Grid Configuration', () => {
    it('configures AG Grid with correct number of rows', async () => {
      render(<TaskListGrid />);
      await waitFor(() => {
        const rowCount = screen.getByTestId('ag-grid-row-count');
        expect(parseInt(rowCount.textContent)).toBeGreaterThan(0);
      });
    });

    it('configures AG Grid with correct number of columns', () => {
      render(<TaskListGrid />);
      const columnCount = screen.getByTestId('ag-grid-column-count');
      expect(parseInt(columnCount.textContent)).toBe(7); // id, title, status, totalItems, pendingItems, completedItems, progress
    });

    it('enables master-detail feature', () => {
      render(<TaskListGrid />);
      const masterDetail = screen.getByTestId('ag-grid-master-detail');
      expect(masterDetail.textContent).toBe('true');
    });

    it('enables pagination', () => {
      render(<TaskListGrid />);
      const pagination = screen.getByTestId('ag-grid-pagination');
      expect(pagination.textContent).toBe('true');
    });

  });

  describe('Adding Task Lists', () => {
    
    it('clears input after adding list', async () => {
      const user = userEvent.setup();
      render(<TaskListGrid />);
      const input = screen.getByPlaceholderText('Create a new task list...');
      
      await user.type(input, 'New List');
      await user.click(screen.getByRole('button', { name: /add list/i }));

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('does not add empty task list', async () => {
      const user = userEvent.setup();
      render(<TaskListGrid />);

      const initialRowCount = Number(screen.getByTestId('ag-grid-row-count').textContent);
      const input = screen.getByPlaceholderText('Create a new task list...');

      await user.type(input, '   ');
      await user.click(screen.getByRole('button', { name: /add list/i }));

      expect(Number(screen.getByTestId('ag-grid-row-count').textContent)).toBe(initialRowCount);
    });

    it('updates AG Grid row count after adding list', async () => {
      const user = userEvent.setup();
      render(<TaskListGrid />);
      const initialRowCount = parseInt(screen.getByTestId('ag-grid-row-count').textContent);
      
      const input = screen.getByPlaceholderText('Create a new task list...');
      await user.type(input, 'Another List');
      await user.click(screen.getByRole('button', { name: /add list/i }));

      await waitFor(() => {
        const newRowCount = parseInt(screen.getByTestId('ag-grid-row-count').textContent);
        expect(newRowCount).toBe(initialRowCount + 1);
      });
    });
  });

  describe('AG Grid Wrapper Styling', () => {
    it('applies custom grid wrapper classes', () => {
      const { container } = render(<TaskListGrid />);
      const gridWrapper = container.querySelector('.custom-grid');
      expect(gridWrapper).toBeInTheDocument();
    });

    it('applies AG Grid Material theme', () => {
      const { container } = render(<TaskListGrid />);
      const gridWrapper = container.querySelector('.ag-theme-material');
      expect(gridWrapper).toBeInTheDocument();
    });
  });

  describe('Loading and Error States', () => {

    it('does not show error state initially', () => {
      render(<TaskListGrid />);
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });
});