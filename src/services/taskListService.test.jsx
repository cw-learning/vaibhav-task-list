import { describe, it, expect, afterEach, vi } from "vitest";
import axios from "axios";
import { fetchTaskLists } from "./taskListService";

vi.mock("axios");

describe("fetchTaskLists (no grouping)", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("maps each todo to an empty task list", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, title: "List A", completed: false },
        { id: 2, title: "List B", completed: true }
      ]
    });

    const result = await fetchTaskLists();

    expect(result).toEqual([
      {
        listId: 1,
        title: "List A",
        completed: false,
        tasks: []
      },
      {
        listId: 2,
        title: "List B",
        completed: true,
        tasks: []
      }
    ]);
  });

  it("throws error when axios fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchTaskLists()).rejects.toThrow("Network error");
  });

  it("supports abort controller signal", async () => {
    const controller = new AbortController();

    axios.get.mockRejectedValueOnce(
      new DOMException("Aborted", "AbortError")
    );

    controller.abort();

    await expect(
      fetchTaskLists(controller.signal)
    ).rejects.toThrow();
  });
});
