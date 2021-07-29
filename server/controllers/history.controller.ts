
  // 새로운 history 추가
  async insertHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { history } = req.body;
      const historyId: number = await HistoryService.insertHistory(history);

      res
        .json({ ok: true, message: '내역이 추가되었습니다.', historyId })
        .status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default new HistoryController();
