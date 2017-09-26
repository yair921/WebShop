CREATE TABLE [dbo].[tbl_orders] (
    [id_order]    INT      IDENTITY (1, 1) NOT NULL,
    [id_customer] INT      NULL,
    [enabled]     BIT      NULL,
    [last_update] DATETIME CONSTRAINT [DF_tbl_orders_last_update] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK_tbl_orders] PRIMARY KEY CLUSTERED ([id_order] ASC),
    CONSTRAINT [FK_tbl_orders_tbl_customers] FOREIGN KEY ([id_customer]) REFERENCES [dbo].[tbl_customers] ([id_customer])
);

