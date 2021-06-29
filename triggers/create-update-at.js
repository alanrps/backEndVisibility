function createUpdateAt(tableName) {
    return `
    CREATE OR REPLACE FUNCTION trigger_set_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN NEW.updated_at = NOW();
    RETURN NEW; END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON "${tableName}"
    FOR EACH ROW EXECUTE PROCEDURE
    trigger_set_updated_at();`;
}

function removeUpdateAt(tableName) {
    return `
  DROP TRIGGER IF EXISTS set_updated_at ON "${tableName}";
  `;
}

module.exports = {
    createUpdateAt,
    removeUpdateAt,
};
