import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
      render(<TaskListGrid />);
      const input = screen.getByPlaceholderText('Create a new task list...');
      
      fireEvent.change(input, { target: { value: 'New List' } });
      fireEvent.click(screen.getByText('Add List'));

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('does not add empty task list', () => {
      render(<TaskListGrid />);
      const input = screen.getByPlaceholderText('Create a new task list...');
      
      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.click(screen.getByText('Add List'));

      expect(input).toHaveValue('   ');
    });

    it('updates AG Grid row count after adding list', async () => {
      render(<TaskListGrid />);
      const initialRowCount = parseInt(screen.getByTestId('ag-grid-row-count').textContent);
      
      const input = screen.getByPlaceholderText('Create a new task list...');
      fireEvent.change(input, { target: { value: 'Another List' } });
      fireEvent.click(screen.getByText('Add List'));

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
      expect(gridWrapper).toHaveClass('rounded-2xl', 'shadow-xl', 'overflow-hidden');
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